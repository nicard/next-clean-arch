import type { GetStaticProps, NextPage } from "next";

type SuccessPageProps = {};

const SuccessPage: NextPage<SuccessPageProps> = (props) => {
  return (
    <div>
      <h1>Success checkout page</h1>
    </div>
  );
};

export default SuccessPage;

/*export const getStaticProps: GetStaticProps = async (context) => {
  //const {data} = await http.get(`pokemon/${name}`);
  
  return {
    props: {
      //pokemon: data
    },
  };
};*/
