import React from 'react';
import styled from 'styled-components';
import { Card, Title } from './shared';
import { Calculator } from 'lucide-react';

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const SummaryItem = styled.div`
  background-color: ${({ theme, $highlight }) => $highlight ? theme.colors.primary : theme.colors.background};
  color: ${({ theme, $highlight }) => $highlight ? theme.colors.white : theme.colors.text};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.9;
`;

const ItemValue = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
`;

const FinalPrice = styled.div`
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const PriceLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

const PriceValue = styled.span`
  font-size: 2rem;
  font-weight: 700;
`;

export const ResultSummary = ({ costs }) => {
  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <Card>
      <Title><Calculator size={20} /> Resumo Financeiro</Title>
      
      <SummaryGrid>
        <SummaryItem>
          <ItemLabel>Custo de Material (Filamento)</ItemLabel>
          <ItemValue>{formatCurrency(costs.filamentCost)}</ItemValue>
        </SummaryItem>
        <SummaryItem>
          <ItemLabel>Custo de Energia</ItemLabel>
          <ItemValue>{formatCurrency(costs.energyCost)}</ItemValue>
        </SummaryItem>
        <SummaryItem>
          <ItemLabel>Custo de Máquina (Depreciação)</ItemLabel>
          <ItemValue>{formatCurrency(costs.machineCost)}</ItemValue>
        </SummaryItem>
      </SummaryGrid>

      <SummaryGrid>
        <SummaryItem $highlight>
          <ItemLabel>Custo Total de Produção</ItemLabel>
          <ItemValue>{formatCurrency(costs.totalProductionCost)}</ItemValue>
        </SummaryItem>
        <SummaryItem>
          <ItemLabel>Lucro Líquido Estimado</ItemLabel>
          <ItemValue>{formatCurrency(costs.profitValue)}</ItemValue>
        </SummaryItem>
      </SummaryGrid>

      <FinalPrice>
        <PriceLabel>Preço Final de Venda Sugerido</PriceLabel>
        <PriceValue>{formatCurrency(costs.suggestedPrice)}</PriceValue>
      </FinalPrice>
    </Card>
  );
};
