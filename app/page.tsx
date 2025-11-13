// app/page.tsx
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value

  // 1. ถ้ามี cookie → ใช้ cookie
  if (localeCookie === 'th' || localeCookie === 'en') {
    redirect(`/${localeCookie}`)
  }

  // 2. ถ้าไม่มี cookie → ดูจากเบราว์เซอร์
  const acceptLanguage = cookieStore.get('accept-language')?.value || ''
  const browserLang = acceptLanguage.split(',')[0].toLowerCase()

  if (browserLang.includes('th')) {
    redirect('/th')
  }

  // 3. ถ้าไม่รู้จริง ๆ → ไปเลือกภาษา
  redirect('/language-select')
}