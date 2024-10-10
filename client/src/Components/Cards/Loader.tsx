import ContentLoader from 'react-content-loader';
import { Container } from './Cards.style';

const ReservationLoader = () => (
    <Container>
        <ContentLoader
            height={160}
        >
            {/* Only SVG shapes */}
            <rect x="0" y="120" rx="0" ry="0" width="200" height="7" />
            <rect x="26" y="35" rx="0" ry="0" width="1" height="1" />
            <rect x="2" y="52" rx="0" ry="0" width="400" height="62" />
            <rect x="328" y="40" rx="0" ry="0" width="74" height="7" />
        </ContentLoader>
    </Container>
);

export default ReservationLoader;
