import Script from "next/script"

export const metadata = { title: "Text Island Mailer | Support Local. Live Hawaii.", robots: { index: false } }
export default function TextOptIn() {
  return (
    <main style={{maxWidth:640,margin:"0 auto",padding:"80px 24px",textAlign:"center",fontFamily:"system-ui,sans-serif",color:"#F5F4EF",lineHeight:1.7}}>
      <h1 style={{fontSize:32,color:"#F5F4EF"}}>Text with Island Mailer</h1>
      <p style={{fontSize:18}}>Tap the chat button in the corner to send us a message and opt in to texts about advertising on the Island Mailer. By submitting, you authorize Island Mailer to text you; msg &amp; data rates may apply, reply STOP to opt out, HELP for help.</p>
      <p style={{marginTop:32,color:"#D5C1AA"}}>Island Mailer · 674 Loina Pl, Paia, HI 96779<br/><a href="mailto:aloha@islandmailer.com" style={{color:"#D5C1AA"}}>aloha@islandmailer.com</a> · (808) 808-6245</p>
      <p style={{marginTop:24,fontSize:14}}><a href="/privacy" style={{color:"#A37C4F"}}>Privacy Policy</a> · <a href="/terms" style={{color:"#A37C4F"}}>Terms of Service</a></p>
      <Script src="https://widgets.leadconnectorhq.com/loader.js" strategy="afterInteractive" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="6a5865d4c9f31412b25eb897" />
    </main>
  )
}
