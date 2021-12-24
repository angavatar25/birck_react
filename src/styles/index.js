import Styled from 'styled-components'

const BORDER_RADIUS = '5px'
const LINE_HEIGHT = '2.5rem'

export const Title = Styled.h1`
    text-size: 20px;
`

export const SearchInput = Styled.input`
    height: ${LINE_HEIGHT};
    background-color: white;
    color: black;
    border: 1px solid gray;
    border-radius: ${BORDER_RADIUS};
    padding: 0;
    padding-left: 10px;
    width: 50%;
    margin-right: 20px;
`

export const SelectDropdown = Styled.select`
    height: ${LINE_HEIGHT};
    background-color: white;
    color: black;
    border: 1px solid gray;
    border-radius: ${BORDER_RADIUS};
    option {
        color: black;
        background: white;
        display: flex;
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
    }
`

export const Grid = Styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-gap: 10px;
    @media only screen and (min-width: 768px) {
        grid-template-columns: auto auto;
    };
    @media only screen and (min-width: 1200px) {
        grid-template-columns: auto auto auto;
    };
`

export const CardContent = Styled.div`
    padding: 3rem 0;
`

export const CardContainer = Styled.div`
    background-color: white;
    color: black;
    padding: 10px;
    display: flex;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border-radius: 10px;
`

export const ProfileContainer = Styled.img.attrs(props => ({
    src: props.Img
}))`
    width: 55px;
    height: 55px;
    border-radius: 9999px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    margin-right: 15px;
`;

export const ProfilePictureDetail = Styled.img.attrs(props => ({
    src: props.Img
}))`
    width: 150px;
    height: 150px;
    border-radius: 9999px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    margin-right: 15px;
`

export const ProfileFollowersDetail = Styled.div`
    background-color: #F5F8FF;
    color: #1E2B48;
    padding: 15px 30px;
    margin-top: 3rem;
    display: flex;
`

export const GitProfile = Styled.p`
    cursor: pointer;
`

export const Pagination = Styled.button`
    background-color: ${props => props.isActive ? '#1E2B48': 'transparent'};
    color: ${props => props.isActive ? 'white' : 'black'};
    border: none;
    font-size: 16px;
    padding: 10px;
    border-radius: 5px;
`