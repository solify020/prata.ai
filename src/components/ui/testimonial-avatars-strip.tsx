
import { Star } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function TestimonialAvatarsStrip() {
  const avatars = [
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1528&ixlib=rb-4.0.3",
  ];

  return (
    <div className="flex flex-col items-center space-y-4 py-4">
      {/* Avatar strip with proper centering */}
      <div className="flex justify-center">
        <div className="flex -space-x-4">
          {avatars.map((avatar, index) => (
            <Avatar 
              key={index}
              className="w-12 h-12 border-2 border-background"
            >
              <AvatarImage 
                src={avatar} 
                alt={`User avatar ${index + 1}`}
                className="object-cover"
              />
            </Avatar>
          ))}
        </div>
      </div>

      {/* Text and stars - Properly centered */}
      <div className="flex flex-col items-center space-y-2">
        <div className="text-sm text-muted-foreground text-center">
          Betrodd av 27 000+ svenska företag
        </div>
        <div className="flex justify-center text-yellow-400">
          <Star className="w-5 h-5 fill-current" />
          <Star className="w-5 h-5 fill-current" />
          <Star className="w-5 h-5 fill-current" />
          <Star className="w-5 h-5 fill-current" />
          <Star className="w-5 h-5 fill-current" />
        </div>
      </div>
    </div>
  );
}
