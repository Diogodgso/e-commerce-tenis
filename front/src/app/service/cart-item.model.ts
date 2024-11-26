export interface CartItem {
  id: number;          // Identificador único do item no carrinho
  name: string;        // Nome do item
  valor: number;       // Valor unitário do item (exemplo: preço)
  description: string; // Descrição do item (opcional, pode ser útil para detalhes adicionais)
  imageUrl: string;    // URL da imagem do item (útil para exibição no carrinho)
  quantity: number;    // Quantidade do item no carrinho
  tamanho: number;     // Tamanho do item, se aplicável (por exemplo, para roupas ou calçados)
}
