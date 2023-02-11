export default function Footer(){
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    return(
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
            <div style={{flex: 1, display: 'flex', width: '100%', height: 80, justifyContent:'left', alignItems: 'center',
                        paddingLeft: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15, marginLeft: 15,
                        marginRight: 15, fontSize: 12 }}>
                <div style={{width: '70%'}}>
                    &copy; Copyright 2010 - {anoAtual} felipefalcao.com.br
                </div>
            </div>
        </div>
    );
}