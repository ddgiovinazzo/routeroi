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

interface MetricsFormProps {
  state: CalculatorState;
  updateField: (field: keyof CalculatorState, value: number | boolean) => void;
}

export const MetricsForm = ({ state, updateField }: MetricsFormProps) => {
  const handleChange = (field: keyof CalculatorState, valStr: string) => {
    const val = parseFloat(valStr);
    updateField(field, isNaN(val) ? 0 : val);
  };

  return (
    <FormCard>
      <FormTitle>Vehicle Profile & Targets</FormTitle>

      <FormGroup>
        <Label htmlFor="gasPrice">Gas Price</Label>
        <InputWrapper>
          <Prefix>$</Prefix>
          <StyledInput
            id="gasPrice"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            style={{ fontSize: '16px' }} // Expressly ensure 16px minimum to prevent iOS zoom
            value={state.gasPrice || ''}
            onChange={(e) => handleChange('gasPrice', e.target.value)}
            $hasPrefix
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>/ gal</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="mpg">Fuel Efficiency (MPG)</Label>
        <InputWrapper>
          <StyledInput
            id="mpg"
            type="number"
            inputMode="numeric"
            step="1"
            min="1"
            style={{ fontSize: '16px' }} // Expressly ensure 16px minimum to prevent iOS zoom
            value={state.mpg || ''}
            onChange={(e) => handleChange('mpg', e.target.value)}
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>MPG</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="maintenanceCpm">Maintenance Cost Per Mile</Label>
        <InputWrapper>
          <Prefix>$</Prefix>
          <StyledInput
            id="maintenanceCpm"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            style={{ fontSize: '16px' }} // Expressly ensure 16px minimum to prevent iOS zoom
            value={state.maintenanceCpm || ''}
            onChange={(e) => handleChange('maintenanceCpm', e.target.value)}
            $hasPrefix
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>/ mi</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="targetHourlyWage">Target Hourly Wage</Label>
        <InputWrapper>
          <Prefix>$</Prefix>
          <StyledInput
            id="targetHourlyWage"
            type="number"
            inputMode="numeric"
            step="1"
            min="0"
            style={{ fontSize: '16px' }} // Expressly ensure 16px minimum to prevent iOS zoom
            value={state.targetHourlyWage || ''}
            onChange={(e) => handleChange('targetHourlyWage', e.target.value)}
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

export default MetricsForm;
