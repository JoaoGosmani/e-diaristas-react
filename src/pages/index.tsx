import Advantages from '@partials/index/_advantages';
import FrequentQuestions from '@partials/index/_frequent-questions';
import Presentation from '@partials/index/_presentation';
import type { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "",
    },
  };
};

const Index: NextPage<{ title: string }> = (props) => {
  return (
    <div>
      <Presentation />
      <Advantages />
      <FrequentQuestions />
    </div>
  );
};

export default Index;
