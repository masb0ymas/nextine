import { Container } from '@mantine/core';
import MyStats from '~/core/components/MyStats/MyStats';
import Footer from '~/layouts/Admin/Footer';
import Header from '~/layouts/Admin/Header';
import Siderbar from '~/layouts/Admin/Sidebar';

export default function HomePage() {
  return (
    <div style={{ display: 'flex' }}>
      <Siderbar />

      <Container size="xl" w="100vw" mih="100vh">
        <Header />

        <MyStats />

        <Footer />
      </Container>
    </div>
  );
}
