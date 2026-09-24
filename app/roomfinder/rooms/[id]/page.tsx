// Server component wrapper — required for static export with dynamic routes
import RoomDetail from './RoomDetailClient';

// Pre-generate pages for the 3 initial static rooms.
// Rooms created dynamically (via localStorage) are handled client-side.
export function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ];
}

export default function Page({ params }: { params: { id: string } }) {
    return <RoomDetail />;
}
