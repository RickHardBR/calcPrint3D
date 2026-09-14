import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  padding-bottom: 12px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  flex: 1;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 8px;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.quaternary};
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.quaternary}40;
  }
`;

export const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.quaternary};
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  background-color: white;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.quaternary}40;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0;
  }
`;
