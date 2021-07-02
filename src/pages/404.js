import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Seo from '../components/seo';

const PageContent = styled.div`
  margin: 0 auto;
  margin-top: ${(props) => (props.inset ? '-40px' : '40px')};
  background: white;
  border-radius: 16px;
  padding: 16px 32px;
  max-width: 1300px;
`;

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <PageContent>
      <h1>NOT FOUND OR UNDER DEVELOPMENT</h1>
      <p>You just found a page that we're still working on... the sadness.</p>
    </PageContent>
  </Layout>
);

export default NotFoundPage;
