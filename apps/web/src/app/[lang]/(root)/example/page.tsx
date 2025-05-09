import PageHeader from "@/components/PageHeader";
import PageHeaderDescription from "@/components/PageHeaderDescription";
import PageHeaderHeading from "@/components/PageHeaderHeading";
import AirdropToken from "@/components/example/AirdropToken";
import CreateToken from "@/components/example/CreateToken";
import GetTokenMetadata from "@/components/example/GetTokenMetadata";
import TransferSol from "@/components/example/TransferSol";
import UpdateMetadata from "@/components/example/UpdateMetadata";
import { getI18n } from "@iroy/i18n";
import { Lang } from "@iroy/i18n/config";

interface Props {
  params: {
    lang: Lang;
  };
}
const BaseTransfer: React.FC<Props> = async ({ params }) => {
  const { lang } = await params;
  const $t = await getI18n<any>(lang);
  return (
    <>
      <PageHeader>
        <PageHeaderHeading> {$t("common.solana")}</PageHeaderHeading>
        <PageHeaderDescription>{$t("tools.solana-desc")}</PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper border-grid py-6">
        <section className="container">
          <div className="grid gap-4 md:grid-cols-2">
            <AirdropToken />
            <TransferSol />
            <CreateToken />
            <UpdateMetadata />
            <GetTokenMetadata />
          </div>
        </section>
      </div>
    </>
  );
};
export default BaseTransfer;
