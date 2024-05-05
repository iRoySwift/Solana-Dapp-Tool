import { Locale } from "@/i18n";
import { useParams } from "next/navigation";

const useLocaleRoute = () => {
    const params = useParams<{ lang: Locale }>();
    const link = (pathName: string) => {
        let segments = pathName.split("/");
        segments[0] = params.lang;
        return `/${segments.join("/")}`;
    };
    return link;
};

export default useLocaleRoute;
