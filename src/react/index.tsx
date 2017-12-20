import * as React from 'react';
import * as ReactRedux from 'react-redux'
import styled, {keyframes} from 'styled-components';
import {fetchRandomUser, State} from '../redux';
import {ApiTypes} from '../redux/api-types';

// Styled-components

const AppWrapper = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FetchButton = styled.button`
  color: grey;
  width: 200px;
  height: 60px;
`;


const rotationAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const AnimationIndicator = styled.span`
  position: absolute;
  margin: auto;
  background-color: palevioletred;
  animation: ${rotationAnimation} 2s linear infinite;
  width: 40px;
  height: 40px;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
`;

// React-component

interface Props {
  user: ApiTypes.User;
  fetchRandomUser: () => void;
  loading: boolean;
}

const App = (props: Props) => 
<AppWrapper>
  <FetchButton
    onClick={() => props.fetchRandomUser()}
  >
    Fetch a new user
  </FetchButton>
  {props.loading ? <AnimationIndicator /> : null}

</AppWrapper>;

// Redux-bindings of the created component + export

const mapStateToProps = (state: State) => ({
  user: state.userData,
  loading: state.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchRandomUser: () => {
    dispatch(fetchRandomUser());
  }
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
