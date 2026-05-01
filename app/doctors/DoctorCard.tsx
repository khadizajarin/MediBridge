
import { Star, Award, MapPin } from "lucide-react";
import { doctors, specialties, cities, Doctor } from "@/data/doctors";
import Link from "next/link";
import Image from "next/image";

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  return (
    <article className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-lg-custom hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="relative overflow-hidden h-56">
        <Image
          src={doctor.image}
          alt={`${doctor.name}, ${doctor.specialty}`}
          loading="lazy"
          sizes="500"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint text-primary-foreground text-xs font-bold">
            <Award className="w-3 h-3" />
            {doctor.badge}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold border border-border">
            {doctor.experience} yrs
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-sora font-bold text-base text-primary-foreground line-clamp-1">{doctor.name}</h3>
          <p className="text-primary-foreground/80 text-xs">{doctor.specialty}</p>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="line-clamp-1">{doctor.hospital}, {doctor.city}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i <= Math.floor(doctor.rating) ? "fill-mint text-mint" : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="font-sora font-bold text-foreground text-sm">{doctor.rating}</span>
          <span className="text-muted-foreground text-xs">({doctor.reviews})</span>
        </div>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="font-sora font-bold text-foreground text-lg">${doctor.fee}</span>
          <span className="text-muted-foreground text-xs">/ visit</span>
        </div>

        <Link
          href={`/doctors/${doctor.id}`}
          className="mt-auto w-full py-2.5 rounded-xl border-2 border-primary text-primary font-semibold text-sm text-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default DoctorCard;