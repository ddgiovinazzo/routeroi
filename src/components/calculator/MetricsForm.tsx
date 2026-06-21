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
  updateField: (field: keyof CalculatorState, value: number) => void;
}

export const MetricsForm = ({ state, updateField }: MetricsFormProps) => {
  const handleChange = (field: keyof CalculatorState, valStr: string) => {
    const val = parseFloat(valStr);
    updateField(field, isNaN(val) ? 0 : val);
  };

  return (
    <FormCard>
      <FormTitle>Vehicle & Driving Metrics</FormTitle>

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
        <Label htmlFor="maintCpm">Maintenance CPM</Label>
        <InputWrapper>
          <Prefix>$</Prefix>
          <StyledInput
            id="maintCpm"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={state.maintCpm || ''}
            onChange={(e) => handleChange('maintCpm', e.target.value)}
            $hasPrefix
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>/ mi</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="replCpm">Vehicle Replacement CPM</Label>
        <InputWrapper>
          <Prefix>$</Prefix>
          <StyledInput
            id="replCpm"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={state.replCpm || ''}
            onChange={(e) => handleChange('replCpm', e.target.value)}
            $hasPrefix
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>/ mi</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="avgMph">Average Active Speed</Label>
        <InputWrapper>
          <StyledInput
            id="avgMph"
            type="number"
            inputMode="numeric"
            step="1"
            min="1"
            value={state.avgMph || ''}
            onChange={(e) => handleChange('avgMph', e.target.value)}
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>MPH</Suffix>
        </InputWrapper>
      </FormGroup>
    </FormCard>
  );
};

export default MetricsForm;
