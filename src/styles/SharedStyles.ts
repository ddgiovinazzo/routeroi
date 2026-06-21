import styled from 'styled-components';

export const FormCard = styled.section`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const FormTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  font-weight: 600;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
  text-align: left;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Prefix = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  pointer-events: none;
`;

export const Suffix = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  pointer-events: none;
`;

export interface InputProps {
  $hasPrefix?: boolean;
  $hasSuffix?: boolean;
  $suffixLength?: number;
}

export const StyledInput = styled.input<InputProps>`
  width: 100%;
  height: 48px;
  background: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.inputText};
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: 0 ${({ theme }) => theme.spacing.md};
  padding-left: ${({ $hasPrefix, theme }) => ($hasPrefix ? '1.75rem' : theme.spacing.md)};
  padding-right: ${({ $hasSuffix, $suffixLength, theme }) =>
    $hasSuffix ? `${($suffixLength || 3) * 0.5 + 1.25}rem` : theme.spacing.md};
  box-sizing: border-box;
  transition: ${({ theme }) => theme.transitions.default};
  font-variant-numeric: tabular-nums;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderFocus};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.borderFocus};
  }

  @media (pointer: coarse) {
    height: 52px;
  }
`;
