import { Avatar, Tooltip } from "@nextui-org/react";

export default function AvatarTop(){

    return (
        <div style={{flex: 1, flexDirection:'row', display: 'flex', paddingTop: 10,
                     paddingRight: 5, paddingLeft: 20, justifyContent: 'center', alignItems: 'center'}}>
            <div>
            <Tooltip
            content={"Olá!"}
            trigger="hover"
            color="secondary"
            >
                <Avatar
                style={{boxShadow:'0px 6px 15px #0952a5'}}
                size="xl"
                src="img/avatar.jpg"
                bordered
                color="primary"
                zoomed
                pointer
                //onClick={() => alert('tsete')}
                />
            </Tooltip>
            </div>

            <div style={{alignSelf:'center', paddingRight: 10, paddingLeft: 10, textAlign: 'left', fontSize: '1rem', lineHeight: '1.2rem',
                         fontWeight: 'normal', letterSpacing: '-0.7px'}}>
                Meu nome é Felipe Falcão, sou desenvolvedor full stack de aplicativos Android e iOS nativos e sistemas web. Confira abaixo alguns dos meus projetos.
            </div>
        </div>
    );
}