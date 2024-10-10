import { Container, Span } from "./Cards.style";
import './index.css';

export default function ReservationError() {
    return (
        <Container>
            <Span className="error" >Oops!</Span>
            <Span className="error">Something went wrong...</Span>
        </Container>
    );
}

