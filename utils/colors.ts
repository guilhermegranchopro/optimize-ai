export const getBackgroundColor = (value: number): string => {
    const colors = [
      "bg-green-500", // 0
      "bg-lime-400", // 1
      "bg-yellow-300", // 2
      "bg-orange-300", // 3
      "bg-red-400", // 4
      "bg-red-600", // 5
    ]
    return colors[value] || "bg-gray-200"
  }  