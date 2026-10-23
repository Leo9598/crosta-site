const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files with fresh cache headers
app.use(express.static(__dirname, {
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (filepath.endsWith('.js') || filepath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
    }
  }
}));

// Reservation email endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, date, time, guests } = req.body;

  if (!name || !date || !time || !guests) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Crosta Reservations" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New Reservation from ${name}`,
      text: `
        You have a new reservation!
        
        Name: ${name}
        Date: ${date}
        Time: ${time}
        Guests: ${guests}
      `,
      html: `
        <h2>New Reservation!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Guests:</strong> ${guests}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

// Review submission endpoint
app.post('/api/submit-review', async (req, res) => {
  const { name, email, category, rating, comment, highlight, aspectRatings } = req.body;

  if (!name || !rating || !comment) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const categoryNames = {
      food: 'Mâncare / Food',
      interior: 'Interior & Design',
      service: 'Serviciu & Ospitalitate / Service',
      bakery: 'Patiserie & Cafea / Bakery & Coffee',
      atmosphere: 'Atmosferă & Ambianță / Atmosphere'
    };

    const categoryLabel = categoryNames[category] || category || 'General';
    const stars = '★'.repeat(Number(rating) || 5) + '☆'.repeat(Math.max(0, 5 - (Number(rating) || 5)));

    const mailOptions = {
      from: `"Crosta Reviews" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `⭐ Recenzie Nouă Crosta (${rating}★ - ${categoryLabel}) de la ${name}`,
      text: `
        Recenzie nouă pentru Crosta Kitchen Bakery!
        
        Oaspete: ${name}
        Email: ${email || 'Nespecificat'}
        Categorie: ${categoryLabel}
        Rating: ${rating} / 5 (${stars})
        Recomandare: ${highlight || 'Nespecificat'}
        
        Mesaj / Părere:
        "${comment}"
      `,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f7f4ee; padding: 25px; color: #32261b;">
          <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
            <h2 style="color: #4a3a2a; border-bottom: 2px solid #b08d57; padding-bottom: 10px; margin-top: 0;">
              ✨ Recenzie Nouă pe Crosta Kitchen
            </h2>
            <p style="font-size: 16px; margin: 8px 0;"><strong>Oaspete:</strong> ${name}</p>
            ${email ? `<p style="font-size: 14px; margin: 8px 0; color: #666;"><strong>Email:</strong> ${email}</p>` : ''}
            <p style="font-size: 15px; margin: 8px 0;"><strong>Categorie:</strong> <span style="background: #e1d4c0; padding: 3px 8px; border-radius: 6px; font-weight: bold;">${categoryLabel}</span></p>
            <p style="font-size: 18px; margin: 12px 0; color: #b08d57;">
              <strong>Rating:</strong> ${stars} (${rating} / 5)
            </p>
            ${highlight ? `<p style="font-size: 14px; margin: 8px 0; background: #faf8f5; padding: 8px; border-left: 3px solid #b08d57;"><strong>Recomandare:</strong> ${highlight}</p>` : ''}
            
            <div style="margin-top: 18px; background: #faf6f0; border-radius: 8px; padding: 15px; border-left: 4px solid #4a3a2a;">
              <p style="margin: 0; font-style: italic; font-size: 15px; line-height: 1.5; color: #333;">
                "${comment}"
              </p>
            </div>
            <p style="margin-top: 25px; font-size: 12px; color: #888; text-align: center;">
              Crosta Kitchen Bakery • Chișinău MD, Strada Miron Costin 13/7
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Review email sent successfully!' });
  } catch (error) {
    console.error('Error sending review email:', error);
    return res.status(500).json({ message: 'Error sending review email', error: error.message });
  }
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Crosta server running on http://localhost:${PORT}`);
});
