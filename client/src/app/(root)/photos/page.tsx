import Link from "next/link";
import React from "react";

interface Props {}
const PhotoPage: React.FC<Props> = () => {
    let photos = Array.from({ length: 6 }, (_, i) => i + 1);

    return (
        <section className="grid items-center justify-center gap-4 p-4 sm:grid-cols-1 md:grid-cols-[repeat(3,200px)] ">
            {photos.map(id => (
                <Link
                    className="decoration-none flex h-48 max-w-52 items-center justify-center rounded-lg bg-slate-50 text-2xl font-medium text-black sm:w-4/5"
                    key={id}
                    href={`/photos/${id}`}
                    passHref>
                    {id}
                </Link>
            ))}
        </section>
    );
};
export default PhotoPage;
