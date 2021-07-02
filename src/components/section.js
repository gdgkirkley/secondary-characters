import styled from 'styled-components';

export default styled.section`
  padding-bottom: 48px;
  border-bottom: 1px solid ${(props) => props.theme.grey9};
  &:last-child {
    border-bottom: none;
  }
  &.head {
    border-bottom: none;
    padding-bottom: 0px;
  }
  & .section-head {
    margin: 36px 0px;
    font-size: ${(props) => props.theme.fontSize.subHeading};
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: ${(props) => props.theme.primary3};
    text-transform: uppercase;
  }
  & .main-content {
    line-height: 2;
  }
`;
