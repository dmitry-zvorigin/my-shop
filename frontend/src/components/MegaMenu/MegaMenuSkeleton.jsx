import Container from "../Shared/Container";

export default function MegaMenuSkeleton() {

  return (
    <div 
      style={{ scrollbarGutter: 'stable both-edges' }}
      className="absolute top-[96px] left-0 w-full bg-white shadow-2xl overflow-y-scroll z-50 h-[calc(70vh)] border-t border-gray-200"
    >
      <Container>
        <div className="grid grid-cols-[306px_1fr] py-5 gap-4">

          <div className="space-y-5 w-full">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx}>
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
            
          <div className="grid grid-cols-1 gap-5 w-full">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx}>
                <div className="h-5 w-60 bg-gray-200 rounded-lg mb-3 animate-pulse py-3" />
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 12 }).map((__, i) => (
                    <div
                      key={i}
                      className="h-5 w-full bg-gray-100 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </Container>
    </div>
  );
}