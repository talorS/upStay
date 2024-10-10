import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const ContainerRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Welcome = styled.h1`
    text-align: center;
    letter-spacing: 0.2rem;
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
        Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-weight: 100;
`;

export const Span = styled.span`
    vertical-align: super;
`;

export const ReservationsSection = styled.div`
    height: 100%;
    padding: 5%;
`;

export const ToolBar = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Select = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const Input = styled.input`
    width: 230px;
`;

export const ReservationSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const Card = styled.div`
    transition: box-shadow 0.3s;
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
        Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-weight: 300;
    position: relative;
    display: flex;
    padding: 5%;
    margin: 1% 0%;
    justify-content: space-evenly;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
        0 0 40px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
        0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;

    :hover {
        box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
        cursor: pointer;
    }

    @media (max-width: 425px) {
        height: 200px;
        padding: 30px;
        display: flex;
        font-size: 13px;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: space-evenly;
    }
`;

export const Label = styled.div`
    width: 60px;
    color: gray;
    font-size: 12px;
`;

export const Value = styled.span`
    width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Uuid = styled.div`
    position: absolute;
    color: gray;
    align-self: center;
    padding: 4px;
    margin: 0 auto;
    font-size: 12px;
    bottom: 0;
    left: 0;

    @media (max-width: 425px) {
        left: unset;
    }
`;

export const CheckIn = styled.div`
    order: 1;
    display: flex;
    width: 20%;
    flex-direction: column;
    justify-content: space-evenly;

    @media (max-width: 425px) {
        width: 50%;
    }
`;

export const CheckOut = styled.div`
    order: 1;
    display: flex;
    width: 20%;
    flex-direction: column;
    justify-content: space-evenly;

    @media (max-width: 425px) {
        width: 50%;
    }
`;

export const Hotel = styled.div`
    order: 2;
    display: flex;
    width: auto;
    flex-direction: column;
    justify-content: space-evenly;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 425px) {
        width: 100%;
    }
`;

export const Room = styled.div`
    order: 3;
    display: flex;
    width: auto;
    flex-direction: column;
    justify-content: space-evenly;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 425px) {
        width: 100%;
    }
`;

export const Price = styled.div`
    position: absolute;
    margin: 3px 5px;
    top: 0;
    right: 0;
`;
