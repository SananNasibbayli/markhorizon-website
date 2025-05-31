import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MarkHorizon - Rəqəmsal Marketinq Bloqu",
  description: "SEO, SMM, Google Ads və ən son süni intellekt alətləri haqqında ekspert məsləhətləri",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az">
      <head>
        {/* JivoChat Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){ 
                var widget_id = 'YOUR_JIVOCHAT_WIDGET_ID';
                var d=document;
                var w=window;
                function l(){
                  var s = document.createElement('script'); 
                  s.type = 'text/javascript'; 
                  s.async = true; 
                  s.src = '//code.jivosite.com/script/widget/'+widget_id; 
                  var ss = document.getElementsByTagName('script')[0]; 
                  ss.parentNode.insertBefore(s, ss);
                }
                if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
