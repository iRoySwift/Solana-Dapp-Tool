import React from "react";

interface Props {
    params?: any;
}
const PhotoPageNo: React.FC<Props> = ({ params: { id } }) => {
    return (
        <div className=" decoration-none decoration-none flex h-24 max-w-52 items-center justify-center rounded-lg bg-slate-50 text-2xl font-medium text-black sm:w-4/5">
            {id}
        </div>
    );
};
export default PhotoPageNo;
