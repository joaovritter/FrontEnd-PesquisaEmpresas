const ESTADOS = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
];

const ABREVIACOES = {
    'av': 'avenida',
    'av.': 'avenida',
    'r': 'rua',
    'r.': 'rua',
    'tv': 'travessa',
    'pç': 'praça',
    'al': 'alameda',
    'rod': 'rodovia',
    'rod.': 'rodovia',
    'estr': 'estrada'
};

function carregarEstados() {
    const selectEstado = document.getElementById('estado');
    selectEstado.innerHTML = '<option value="">Selecione o estado</option>';
    
    ESTADOS.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.sigla;
        option.textContent = `${estado.sigla} - ${estado.nome}`;
        selectEstado.appendChild(option);
    });
}

function expandirAbreviacoes(logradouro) {
    const palavras = logradouro.toLowerCase().split(' ');
    const primeiro = ABREVIACOES[palavras[0]] || palavras[0];
    palavras[0] = primeiro.charAt(0).toUpperCase() + primeiro.slice(1);
    return palavras.join(' ');
}

function construirQuery(logradouro, numero, cidade, estado) {
    const logradouroExpandido = expandirAbreviacoes(logradouro);
    const pesquisa = `'${logradouroExpandido}' & '${numero}' & '${cidade}' & '${estado}'`;
    
    return {
        pesquisa: pesquisa
    };
}

document.addEventListener('DOMContentLoaded', () => {
    carregarEstados();

    document.getElementById('pesquisaForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const logradouro = document.getElementById('logradouro').value;
        const numero = document.getElementById('numero').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;

        const query = construirQuery(logradouro, numero, cidade, estado);
        
        document.getElementById('queryTexto').textContent = JSON.stringify(query, null, 2);
        document.getElementById('queryBox').style.display = 'block';
    });

    document.getElementById('copiarBtn').addEventListener('click', () => {
        const queryTexto = document.getElementById('queryTexto').textContent;
        navigator.clipboard.writeText(queryTexto);
        alert('Query copiada para a área de transferência!');
    });
});