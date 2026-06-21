import styled from 'styled-components';
import type { CalculatorState } from '../../hooks/useCalculatorState';

const FormCard = styled.section`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const FormTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  font-weight: 600;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
  text-align: left;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Prefix = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  pointer-events: none;
`;

const Suffix = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  pointer-events: none;
`;

interface InputProps {
  $hasPrefix?: boolean;
  $hasSuffix?: boolean;
  $suffixLength?: number;
}

const StyledInput = styled.input<InputProps>`
  width: 100%;
  height: 48px;
  background: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.inputText};
  font-size: 1rem;
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

interface OverheadFormProps {
  state: CalculatorState;
  updateField: (field: keyof CalculatorState, value: number) => void;
}

export const OverheadForm = ({ state, updateField }: OverheadFormProps) => {
  const handleChange = (field: keyof CalculatorState, valStr: string) => {
    const val = parseFloat(valStr);
    updateField(field, isNaN(val) ? 0 : val);
  };

  return (
    <FormCard>
      <FormTitle>Fixed Overhead & Goals</FormTitle>

      <FormGroup>
        <Label htmlFor="insurance">Commercial Insurance</Label>
        <InputWrapper>
          <Prefix>$</Prefix>
          <StyledInput
            id="insurance"
            type="number"
            inputMode="numeric"
            step="1"
            min="0"
            value={state.insurance || ''}
            onChange={(e) => handleChange('insurance', e.target.value)}
            $hasPrefix
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>/ mo</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phone">Phone & Plan Overhead</Label>
        <InputWrapper>
          <Prefix>$</Prefix>
          <StyledInput
            id="phone"
            type="number"
            inputMode="numeric"
            step="1"
            min="0"
            value={state.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            $hasPrefix
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>/ mo</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="hours">Active Gig Hours</Label>
        <InputWrapper>
          <StyledInput
            id="hours"
            type="number"
            inputMode="numeric"
            step="1"
            min="1"
            value={state.hours || ''}
            onChange={(e) => handleChange('hours', e.target.value)}
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>/ mo</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="targetWage">Target Net Hourly Wage</Label>
        <InputWrapper>
          <Prefix>$</Prefix>
          <StyledInput
            id="targetWage"
            type="number"
            inputMode="numeric"
            step="1"
            min="0"
            value={state.targetWage || ''}
            onChange={(e) => handleChange('targetWage', e.target.value)}
            $hasPrefix
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>/ hr</Suffix>
        </InputWrapper>
      </FormGroup>
    </FormCard>
  );
};

export default OverheadForm;
