import React, { useState, useEffect, useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { printers, filamentBrands, filamentTypes } from './data/mockData';
import { Card, Title, InputGroup, Label, Input, Select, Row } from './components/shared';
import { ResultSummary } from './components/ResultSummary';
import { Printer, Box, Clock, Zap, DollarSign, DownloadCloud, Loader2 } from 'lucide-react';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px;
`;

const HeaderWrapper = styled.div`
  margin-bottom: 40px;

  @media (max-width: 600px) {
    margin-bottom: 24px;
  }
`;

const MainTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 24px;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 16px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
`;

const Logo = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  flex-shrink: 0;
`;

const SubTitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.1rem;
  line-height: 1.5;
  text-align: left;
  max-width: 600px;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 0.95rem;
    text-align: center;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding-top: 32px;
  margin-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.85rem;
`;

function App() {
  const [selectedPrinter, setSelectedPrinter] = useState(printers[0].id);
  const [powerW, setPowerW] = useState(printers[0].powerW);

  const [filamentBrand, setFilamentBrand] = useState(filamentBrands[0].id);
  const [filamentType, setFilamentType] = useState(filamentTypes[0].id);
  const [filamentPriceKg, setFilamentPriceKg] = useState(110);

  const [printWeightGrams, setPrintWeightGrams] = useState('');
  const [printTimeHours, setPrintTimeHours] = useState('');
  const [printTimeMinutes, setPrintTimeMinutes] = useState('');

  const [energyTariff, setEnergyTariff] = useState(1.15); 
  const [machineDepreciationRate, setMachineDepreciationRate] = useState(1.50);

  const [profitMargin, setProfitMargin] = useState(100); 
  const [failureRate, setFailureRate] = useState(5); 

  // API Estados
  const [distribuidoras, setDistribuidoras] = useState([]);
  const [selectedDistribuidora, setSelectedDistribuidora] = useState('');
  const [selectedUF, setSelectedUF] = useState('');
  const [loadingDist, setLoadingDist] = useState(false);
  const [loadingTarifa, setLoadingTarifa] = useState(false);
  const [apiError, setApiError] = useState('');

  const UFS = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

  const MOCK_DISTRIBUIDORAS = [
    { nome: 'CEMIG (MG)', tarifaB1: 0.95 },
    { nome: 'ENEL (SP)', tarifaB1: 0.89 },
    { nome: 'Light (RJ)', tarifaB1: 1.05 },
    { nome: 'Copel (PR)', tarifaB1: 0.85 },
    { nome: 'Neoenergia (BA)', tarifaB1: 0.92 },
    { nome: 'Equatorial (PA/MA)', tarifaB1: 0.98 }
  ];

  // Acordar API no início, sem buscar todas
  useEffect(() => {
    fetch('/api/carregar-cache', { signal: AbortSignal.timeout(6000) }).catch(() => {});
  }, []);

  // Buscar Distribuidoras por UF
  useEffect(() => {
    const fetchDistribuidorasPorUF = async () => {
      if (!selectedUF) {
        setDistribuidoras([]);
        setSelectedDistribuidora('');
        return;
      }
      
      setLoadingDist(true);
      setApiError('');
      try {
        const res = await fetch(`/api/distribuidoras/estado/${selectedUF}`, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) throw new Error('Falha HTTP');
        const data = await res.json();
        
        if (data && data.sucesso && data.dados) {
          setDistribuidoras(data.dados.sort((a, b) => a.nome.localeCompare(b.nome)));
          setSelectedDistribuidora(''); // reseta distribuidora ao trocar de estado
        } else {
          throw new Error('Formato inválido');
        }
      } catch (err) {
        setApiError(`A API falhou ao buscar distribuidoras de ${selectedUF}.`);
        // Fallback simples para o mock se falhar
        setDistribuidoras(MOCK_DISTRIBUIDORAS);
      } finally {
        setLoadingDist(false);
      }
    };
    fetchDistribuidorasPorUF();
  }, [selectedUF]);

  // Buscar tarifa ao selecionar distribuidora
  useEffect(() => {
    const fetchTarifa = async () => {
      if (!selectedDistribuidora) return;
      setLoadingTarifa(true);
      setApiError('');
      try {
        const res = await fetch(`/api/distribuidoras/buscar?nome=${selectedDistribuidora}`, { signal: AbortSignal.timeout(4000) });
        if (!res.ok) throw new Error('Falha HTTP');
        const data = await res.json();
        
        // A API retorna algo como: { sucesso: true, dados: [{ tarifa_energia_kwh: 0.749 }] }
        let tarifa = 0;
        if (data && data.sucesso && data.dados && data.dados.length > 0) {
          tarifa = data.dados[0].tarifa_energia_kwh || data.dados[0].tarifaB1 || data.dados[0].tarifa || data.dados[0].valor;
        }
        
        if (tarifa) {
          setEnergyTariff(parseFloat(tarifa).toFixed(2));
        } else {
          throw new Error('Formato desconhecido');
        }
      } catch (err) {
        // Fallback para o modo offline (pegar da mock list)
        const mockMatch = MOCK_DISTRIBUIDORAS.find(d => d.nome === selectedDistribuidora);
        if (mockMatch) {
          setEnergyTariff(mockMatch.tarifaB1.toFixed(2));
        } else {
          setApiError('Erro ao consultar a tarifa da operadora.');
        }
      } finally {
        setLoadingTarifa(false);
      }
    };
    fetchTarifa();
  }, [selectedDistribuidora]);

  useEffect(() => {
    if (selectedPrinter !== 'custom') {
      const printer = printers.find(p => p.id === selectedPrinter);
      if (printer) setPowerW(printer.powerW);
    }
  }, [selectedPrinter]);

  const costs = useMemo(() => {
    const wGrams = parseFloat(printWeightGrams) || 0;
    const priceKg = parseFloat(filamentPriceKg) || 0;
    const tHours = parseFloat(printTimeHours) || 0;
    const tMins = parseFloat(printTimeMinutes) || 0;
    const pW = parseFloat(powerW) || 0;
    const eTariff = parseFloat(energyTariff) || 0;
    const mDepRate = parseFloat(machineDepreciationRate) || 0;
    const fRate = parseFloat(failureRate) || 0;
    const pMargin = parseFloat(profitMargin) || 0;

    const filamentCost = (wGrams / 1000) * priceKg;
    const totalTimeHours = tHours + (tMins / 60);
    const energyCost = totalTimeHours * (pW / 1000) * eTariff;
    const machineCost = totalTimeHours * mDepRate;
    
    const totalProductionCost = filamentCost + energyCost + machineCost;
    const costWithFailure = totalProductionCost * (1 + (fRate / 100));
    
    const suggestedPrice = costWithFailure * (1 + (pMargin / 100));
    const profitValue = suggestedPrice - totalProductionCost;

    return {
      filamentCost,
      energyCost,
      machineCost,
      totalProductionCost,
      profitValue,
      suggestedPrice
    };
  }, [printWeightGrams, filamentPriceKg, printTimeHours, printTimeMinutes, powerW, energyTariff, machineDepreciationRate, failureRate, profitMargin]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <HeaderWrapper>
          <MainTitle>Calculadora de Custos 3D</MainTitle>
          <HeaderContent>
            <Logo src="/favicon.png" alt="Logo Calculadora de Custos 3D" />
            <SubTitle>
              Precifique suas impressões 3D com precisão. Ferramenta automatizada para calcular o preço ideal de venda considerando filamento, consumo elétrico, desgaste e margem de lucro.
            </SubTitle>
          </HeaderContent>
        </HeaderWrapper>

        <Card>
          <Title><Printer size={20} /> Equipamento (Impressora 3D)</Title>
          <Row>
            <InputGroup>
              <Label>Modelo da Impressora</Label>
              <Select value={selectedPrinter} onChange={(e) => setSelectedPrinter(e.target.value)}>
                {printers.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>Consumo Médio (Watts)</Label>
              <Input 
                type="number" 
                value={powerW} 
                onChange={(e) => setPowerW(e.target.value)}
                disabled={selectedPrinter !== 'custom'}
              />
            </InputGroup>
          </Row>
        </Card>

        <Card>
          <Title><Box size={20} /> Filamento e Material</Title>
          <Row>
            <InputGroup>
              <Label>Marca</Label>
              <Select value={filamentBrand} onChange={(e) => setFilamentBrand(e.target.value)}>
                {filamentBrands.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>Tipo</Label>
              <Select value={filamentType} onChange={(e) => setFilamentType(e.target.value)}>
                {filamentTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>Preço do Rolo (R$/kg)</Label>
              <Input 
                type="number" 
                value={filamentPriceKg} 
                onChange={(e) => setFilamentPriceKg(e.target.value)}
              />
            </InputGroup>
          </Row>
        </Card>

        <Card>
          <Title><Clock size={20} /> Dados do Fatiador</Title>
          <Row>
            <InputGroup>
              <Label>Peso Total da Peça com Suportes (g)</Label>
              <Input 
                type="number" 
                value={printWeightGrams} 
                onChange={(e) => setPrintWeightGrams(e.target.value)}
                placeholder="Ex: 150"
              />
            </InputGroup>
            <InputGroup>
              <Label>Tempo (Horas)</Label>
              <Input 
                type="number" 
                value={printTimeHours} 
                onChange={(e) => setPrintTimeHours(e.target.value)}
                placeholder="Ex: 5"
              />
            </InputGroup>
            <InputGroup>
              <Label>Tempo (Minutos)</Label>
              <Input 
                type="number" 
                value={printTimeMinutes} 
                onChange={(e) => setPrintTimeMinutes(e.target.value)}
                placeholder="Ex: 30"
              />
            </InputGroup>
          </Row>
        </Card>

        <Card>
          <Title><Zap size={20} /> Energia e Custos Operacionais</Title>
          <Row>
            <InputGroup style={{ flex: 0.8 }}>
              <Label>Estado (UF)</Label>
              <Select value={selectedUF} onChange={(e) => setSelectedUF(e.target.value)}>
                <option value="">UF...</option>
                {UFS.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </Select>
            </InputGroup>

            <InputGroup style={{ flex: 2 }}>
              <Label>
                Distribuidora
                {loadingDist && <Loader2 size={14} style={{ marginLeft: 8 }} className="spin" />}
              </Label>
              <Select 
                value={selectedDistribuidora} 
                onChange={(e) => setSelectedDistribuidora(e.target.value)}
                disabled={!selectedUF || loadingDist || distribuidoras.length === 0}
              >
                <option value="">
                  {!selectedUF ? "Selecione o UF primeiro" : "Selecione a distribuidora..."}
                </option>
                {distribuidoras.map(d => (
                  <option key={d.slug || d.nome} value={d.nome}>{d.nome}</option>
                ))}
              </Select>
            </InputGroup>
          </Row>

          {apiError && <div style={{ color: '#F44336', fontSize: '0.85rem', marginBottom: '10px' }}>{apiError}</div>}

          <Row>
            <InputGroup>
              <Label>
                Tarifa de Energia (R$/kWh)
                {loadingTarifa && <Loader2 size={12} className="lucide-spin" style={{ marginLeft: 8 }} />}
              </Label>
              <Input 
                type="number" 
                step="0.01"
                value={energyTariff} 
                onChange={(e) => setEnergyTariff(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>Depreciação/Desgaste da Máquina (R$/h)</Label>
              <Input 
                type="number" 
                step="0.1"
                value={machineDepreciationRate} 
                onChange={(e) => setMachineDepreciationRate(e.target.value)}
              />
            </InputGroup>
          </Row>
        </Card>

        <Card>
          <Title><DollarSign size={20} /> Precificação e Riscos</Title>
          <Row>
            <InputGroup>
              <Label>Taxa de Falha/Risco (%)</Label>
              <Input 
                type="number" 
                value={failureRate} 
                onChange={(e) => setFailureRate(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>Margem de Lucro Desejada (%)</Label>
              <Input 
                type="number" 
                value={profitMargin} 
                onChange={(e) => setProfitMargin(e.target.value)}
              />
            </InputGroup>
          </Row>
        </Card>

        <ResultSummary costs={costs} />

        <Footer>
          &copy; {new Date().getFullYear()} Desenvolvido por RickHardBR. Todos os direitos reservados.
        </Footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
