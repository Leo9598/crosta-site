const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

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

    let aspectDetails = '';
    if (aspectRatings && typeof aspectRatings === 'object') {
      aspectDetails = `
        <div style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed #ddd;">
          <h4 style="margin: 0 0 8px 0; color: #4a3a2a;">Note detaliate:</h4>
          <p style="margin: 4px 0;">🍽️ Mâncare: ${aspectRatings.food || '-'} / 5</p>
          <p style="margin: 4px 0;">🏛️ Interior: ${aspectRatings.interior || '-'} / 5</p>
          <p style="margin: 4px 0;">🛎️ Serviciu: ${aspectRatings.service || '-'} / 5</p>
        </div>
      `;
    }

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
            <p style="font-size: 15px; margin: 8px 0;"><strong>Categorie principală:</strong> <span style="background: #e1d4c0; padding: 3px 8px; border-radius: 6px; font-weight: bold;">${categoryLabel}</span></p>
            <p style="font-size: 18px; margin: 12px 0; color: #b08d57;">
              <strong>Rating:</strong> ${stars} (${rating} / 5)
            </p>
            ${highlight ? `<p style="font-size: 14px; margin: 8px 0; background: #faf8f5; padding: 8px; border-left: 3px solid #b08d57;"><strong>Recomandare:</strong> ${highlight}</p>` : ''}
            
            <div style="margin-top: 18px; background: #faf6f0; border-radius: 8px; padding: 15px; border-left: 4px solid #4a3a2a;">
              <p style="margin: 0; font-style: italic; font-size: 15px; line-height: 1.5; color: #333;">
                "${comment}"
              </p>
            </div>

            ${aspectDetails}

            <p style="margin-top: 25px; font-size: 12px; color: #888; text-align: center;">
              Crosta Kitchen Bakery • Chișinău MD, Strada Miron Costin 13/7
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Review received successfully!' });
  } catch (error) {
    console.error('Error sending review notification email:', error);
    // Return 200 with notice or 500 so client knows
    return res.status(500).json({ message: 'Error notifying review', error: error.message });
  }
}
