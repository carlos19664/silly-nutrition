import { EmailLayout } from "../email-templates/email-layout"

// Support Response Templates
export function SupportResponseTemplate({
  customerName,
  issueType,
  responseContent,
}: {
  customerName: string
  issueType: string
  responseContent: string
}) {
  return (
    <EmailLayout preheader="We're here to help - Silly Nutrition Support">
      <h1>Hi {customerName},</h1>

      <p>Thanks for reaching out to Silly Nutrition support. We're here to help you succeed on your health journey!</p>

      <div className="highlight-box">
        <h3>Regarding: {issueType}</h3>
        <div dangerouslySetInnerHTML={{ __html: responseContent }} />
      </div>

      <p>If you need any further assistance, just reply to this email. We typically respond within 24-48 hours.</p>

      <p>
        Keep up the great work!
        <br />
        <strong>The Silly Nutrition Support Team</strong>
      </p>
    </EmailLayout>
  )
}

export function RefundConfirmationEmail({
  customerName,
  refundAmount,
  refundReason,
  processingDays = "5-7",
}: {
  customerName: string
  refundAmount: number
  refundReason: string
  processingDays?: string
}) {
  return (
    <EmailLayout preheader="Your refund has been processed - Silly Nutrition">
      <h1>Refund Processed</h1>

      <p>Hi {customerName},</p>

      <p>
        We've processed your refund request as requested. While we're sorry to see you go, we understand that our
        service wasn't the right fit for you at this time.
      </p>

      <div className="highlight-box">
        <h3>Refund Details</h3>
        <p>
          <strong>Amount:</strong> £{refundAmount.toFixed(2)}
          <br />
          <strong>Reason:</strong> {refundReason}
          <br />
          <strong>Processing Time:</strong> {processingDays} business days
          <br />
          <strong>Refund Method:</strong> Original payment method
        </p>
      </div>

      <p>
        You should see the refund appear in your account within {processingDays} business days. If you don't see it
        after this time, please contact your bank or card provider.
      </p>

      <h2>We'd Love Your Feedback</h2>
      <p>
        If you have a moment, we'd really appreciate knowing what we could have done better. Your feedback helps us
        improve for future customers.
      </p>

      <p>If you ever want to give Silly Nutrition another try, we'll be here with open arms (and fresh meal plans!).</p>

      <p>
        Wishing you all the best on your health journey,
        <br />
        <strong>The Silly Nutrition Team</strong>
      </p>
    </EmailLayout>
  )
}

export function CancellationConfirmationEmail({
  customerName,
  cancellationDate,
  accessEndDate,
  cancellationReason,
}: {
  customerName: string
  cancellationDate: string
  accessEndDate: string
  cancellationReason: string
}) {
  return (
    <EmailLayout preheader="Subscription cancelled - Silly Nutrition">
      <h1>Subscription Cancelled</h1>

      <p>Hi {customerName},</p>

      <p>We've successfully cancelled your Silly Nutrition subscription as requested. We're sorry to see you go!</p>

      <div className="highlight-box">
        <h3>Cancellation Details</h3>
        <p>
          <strong>Cancelled on:</strong> {cancellationDate}
          <br />
          <strong>Access ends:</strong> {accessEndDate}
          <br />
          <strong>Reason:</strong> {cancellationReason}
        </p>
      </div>

      <h2>What Happens Next?</h2>
      <p>
        • You'll continue to have access to your plans until {accessEndDate}
        <br />• No further charges will be made to your account
        <br />• You can still download any existing meal plans and workouts
        <br />• Your account data will be kept for 90 days in case you want to return
      </p>

      <h2>Come Back Anytime</h2>
      <p>
        If you change your mind, you can easily reactivate your subscription by logging into your dashboard. We'll be
        here whenever you're ready!
      </p>

      <p>
        Thanks for being part of the Silly Nutrition community,
        <br />
        <strong>The Silly Nutrition Team</strong>
      </p>
    </EmailLayout>
  )
}

export function TechnicalSupportEmail({
  customerName,
  issueDescription,
  troubleshootingSteps,
  escalated = false,
}: {
  customerName: string
  issueDescription: string
  troubleshootingSteps: string[]
  escalated?: boolean
}) {
  return (
    <EmailLayout preheader="Technical support help - Silly Nutrition">
      <h1>Technical Support</h1>

      <p>Hi {customerName},</p>

      <p>Thanks for reporting the technical issue you're experiencing. We're here to help get you back on track!</p>

      <div className="highlight-box">
        <h3>Issue: {issueDescription}</h3>
        <p>Here are some troubleshooting steps to try:</p>
        <ol>
          {troubleshootingSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      {escalated ? (
        <p>
          <strong>
            This issue has been escalated to our technical team. We'll follow up within 24 hours with a solution.
          </strong>
        </p>
      ) : (
        <p>If these steps don't resolve the issue, please reply to this email with:</p>
      )}

      <ul>
        <li>What device/browser you're using</li>
        <li>Any error messages you see</li>
        <li>Screenshots if possible</li>
      </ul>

      <p>
        We're committed to getting this sorted for you quickly!
        <br />
        <strong>The Silly Nutrition Support Team</strong>
      </p>
    </EmailLayout>
  )
}
