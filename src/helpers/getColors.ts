const COLORS = { rojo: '#e53e3e', amarillo: '#f3c823', verde: '#38a169' };

export const getHADBackgroundColor = (number: number) => {
    let color = COLORS.rojo;
    if (number >= 0 && number <= 7) {
      color = COLORS.verde;
    } else if (number >= 8 && number <= 10) {
      color = COLORS.amarillo;
    }
    return color;
};
export const getTotalDTSBackgroundColor = (number: number) => {
    let color = COLORS.rojo;
    if (number >= 0 && number <= 26) {
      color = COLORS.verde;
    } else if (number >= 27 && number <= 54) {
      color = COLORS.amarillo;
    }
    return color;
};
