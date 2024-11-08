/* eslint-disable @next/next/no-img-element */
export default function SkinCard({ skin }: { skin: any }) {
  return (
    <div className="border rounded-lg shadow-lg p-4 w-full max-w-xs">
      <img
      style={{
        width: '250px',
        height: '140px',
      }}
        src={skin.image}
        alt={skin.name}
       
      />
      <h3 className="mt-2 font-semibold text-lg">{skin.name}</h3>
      <p className="text-gray-500 text-sm">{skin.description}</p>
      <p className="mt-2 font-bold text-blue-600">${skin.price}</p>
      <p className="text-gray-600 text-sm">Float: {skin.float}</p>
      <p className="text-gray-600 text-sm">Categoria: {skin.category}</p>
    </div>
  );
}
