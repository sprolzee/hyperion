import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const projectDescription = formData.get('projectDescription') as string
    const email = formData.get('email') as string

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    })

    // Collect all files
    const attachments: any[] = []
    let fileIndex = 0
    
    while (formData.has(`file_${fileIndex}`)) {
      const file = formData.get(`file_${fileIndex}`) as File
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type,
        })
      }
      fileIndex++
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'New CAD Design Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New CAD Design Request
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Project Description:</h3>
            <p style="color: #6c757d; line-height: 1.6; white-space: pre-wrap;">${projectDescription}</p>
          </div>
          
          ${attachments.length > 0 ? `
            <div style="background-color: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057; margin-top: 0;">Attached Files (${attachments.length}):</h3>
              <ul style="color: #6c757d;">
                ${attachments.map(file => `<li>${file.filename}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          <div style="background-color: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #0c5460; margin: 0; font-size: 14px;">
              <strong>Note:</strong> This request was submitted through the Hyperion CAD project portal.
            </p>
          </div>
        </div>
      `,
      attachments: attachments,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    )
  }
}
