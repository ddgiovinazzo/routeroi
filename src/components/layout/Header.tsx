import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.hero};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.textPrimary} 0%, ${({ theme }) => theme.colors.textAccent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.spacing.xs};
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Title>RouteROI</Title>
      <Subtitle>Gig-Economy Delivery Profitability Calculator</Subtitle>
    </HeaderContainer>
  );
};

export default Header;
