import styled from 'styled-components';
import type { CalculatorState } from '../../hooks/useCalculatorState';
import {
  FormCard,
  FormTitle,
  FormGroup,
  Label,
  InputWrapper,
  Prefix,
  Suffix,
  StyledInput,
} from '../../styles/SharedStyles';

const HelperText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-bottom: 0;
  font-style: italic;
  text-align: left;
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

      <FormGroup>
        <Label htmlFor="taxRate">Tax Buffer Provision (%)</Label>
        <InputWrapper>
          <StyledInput
            id="taxRate"
            type="number"
            inputMode="numeric"
            step="1"
            min="0"
            max="100"
            value={state.taxRate !== undefined ? state.taxRate : ''}
            onChange={(e) => handleChange('taxRate', e.target.value)}
            $hasSuffix
            $suffixLength={1}
            required
          />
          <Suffix>%</Suffix>
        </InputWrapper>
        <HelperText>Combined % to hold back for SE and Income Tax</HelperText>
      </FormGroup>
    </FormCard>
  );
};

export default OverheadForm;
