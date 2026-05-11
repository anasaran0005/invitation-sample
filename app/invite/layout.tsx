import MusicPlayer from '@/components/MusicPlayer'

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <MusicPlayer />
      {children}
    </div>
  )
}
