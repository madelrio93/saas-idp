import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { SaasList } from "@/components/SaasList";
import { SaaSInfo } from "@/types/saas-info";

export const App = () => {
  const [data, setData] = useState<SaaSInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSaasInfo = async () => {
      try {
        setLoading(true);
        const response = await new Promise<SaaSInfo[]>((resolve, reject) => {
          setTimeout(async () => {
            const data = await storage.getItem<SaaSInfo[]>("local:data");
            if (data) {
              resolve(data);
            } else {
              reject(new Error("No data found"));
            }
          }, 2000);
        });

        setData(response);
      } catch (error) {
        console.error("Error fetching SaaS info:", error);
      } finally {
        setLoading(false);
      }
    };

    getSaasInfo();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        {loading ? (
          new Array(5).fill("").map((_, idx) => <Loading key={idx} />)
        ) : (
          <SaasList data={data} />
        )}
      </div>
    </Layout>
  );
};
