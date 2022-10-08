import { useForm } from 'react-hook-form';
import './App.css';

function App() {
    const { register, handleSubmit, setValue, setFocus } = useForm();

    const onSubmit = (e) => {
        console.log(e);
    };

    const checkCEP = (e) => {
        // A função replace está removendo tudo que não seja número estou também usando RegEx
        const cep = e.target.value.replace(/\D/g, '');
        //função FETCH estou fazendo o consumo da API com sua URL
        fetch(`https://viacep.com.br/ws/${cep}/json`)
            .then((res) => res.json())
            .then((data) => {
                //Momento do Uso do React-Hooks-form
                //seValue ReactForm ele é acompanhado com o Register ele atribui um valor ou algo que eu queiea incluir em qualquer coisa do meu HTML seja input ou outra coisa.
                setValue('address', data.logradouro);
                setValue('neighborhood', data.bairro);
                setValue('city', data.localidade);
                setValue('uf', data.uf);
                //setFocus ele direciona o foco para outra coisa que adicionar
                setFocus('addressNumber');
            });
    };

    return (
        <div className="App">
            <form className="form-main" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <h4>Cep:</h4>

                    <input
                        type="text"
                        placeholder="Digite seu Cep"
                        /*Register ele deixa marcado/registrado a tag para que eu possa atribuir o que eu queira de uma forma prática*/
                        {...register('cep')}
                        /* O evento onBlur faz com que quando o campo perder o foco  a função estabelecida aconteça */
                        onBlur={checkCEP}
                    />
                </label>

                <label>
                    <h4>Rua:</h4>
                    <input
                        type="text"
                        placeholder="Digite seu Rua"
                        {...register('address')}
                    />
                </label>

                <label>
                    <h4>Número:</h4>
                    <input
                        type="text"
                        placeholder="Digite seu Número"
                        {...register('addressNumber')}
                    />
                </label>

                <label>
                    <h4>Bairro:</h4>
                    <input
                        type="text"
                        placeholder="Digite seu Bairro"
                        {...register('neighborhood')}
                    />
                </label>

                <label>
                    <h4>Cidade:</h4>
                    <input
                        type="text"
                        placeholder="Digite sua Cidade"
                        {...register('city')}
                    />
                </label>

                <label>
                    <h4>Estado:</h4>
                    <input
                        type="text"
                        placeholder="Digite seu Estado"
                        {...register('uf')}
                    />
                </label>

                <h2></h2>

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default App;
