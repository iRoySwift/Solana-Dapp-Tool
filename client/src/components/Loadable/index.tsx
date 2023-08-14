import React, { Suspense } from "react";
import Loader from "./Loader";

interface Props {}
const Loadable =
    (Component): React.FC<Props> =>
    props =>
        (
            <Suspense fallback={<Loader />}>
                <Component {...props} />
            </Suspense>
        );

export default Loadable;
