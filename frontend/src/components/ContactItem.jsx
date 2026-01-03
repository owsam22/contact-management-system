export default function ContactItem({ contact, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{contact.name}</div>
            <div className="text-xs text-gray-400">{formatDate(contact.createdAt)}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contact.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contact.phone}</td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={contact.message}>
        {contact.message || <span className="text-gray-300 italic">—</span>}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onDelete(contact._id)}
          className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
          title="Delete Contact"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </td>
    </tr>
  );
}
