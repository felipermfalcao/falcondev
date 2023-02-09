export default function Logo(props) {

    let cor;
    if(props.tema)
    {
        if (props.tema == 'dark')
        {
            cor = '#E4E4E7';
        }
        else
        {
            cor = '#334155';
        }
    }
    else
    {
        cor = '#E4E4E7';
    }

    return (
       <svg version="1.1" id="Camada_1" x="0px" y="0px" viewBox="0 0 425.7 58.4" fill={cor}>
       <g>
           <g>
               <g id="element-id-31456">
                   <path id="element-id-34820" class="st0" d="M31.4,12.3l4.4-8.8H3.6v49.8h8.8V32.8h19V24h-19V12.3L31.4,12.3z"/>
                   <path id="element-id-89208" class="st0" d="M71.5,53.3h9.7L58.5,2.8L35.8,53.3h9.6l5.3-11.7h15.7L71.5,53.3z M54.6,32.8l3.9-8.6
                       l3.9,8.6H54.6z"/>
                   <path id="element-id-81818" class="st0" d="M116.3,44.5h-19v-41h-8.8v49.8h32.2L116.3,44.5z"/>
                   <path id="element-id-74836" class="st0" d="M146.3,45.2c-9.3,0-16.8-7.5-16.8-16.8s7.5-16.8,16.8-16.8c5.9,0,11,3,14,7.5l4.3-8.6
                       c-4.7-4.8-11.1-7.7-18.3-7.7c-14.1,0-25.6,11.5-25.6,25.6c0,14.1,11.5,25.6,25.6,25.6c7.2,0,13.6-2.9,18.3-7.7l-4.3-8.6
                       C157.3,42.2,152.1,45.2,146.3,45.2L146.3,45.2z"/>
                   <path id="element-id-64791" class="st0" d="M196,2.8c-14.1,0-25.6,11.5-25.6,25.6c0,14.1,11.5,25.6,25.6,25.6
                       c14.1,0,25.6-11.5,25.6-25.6C221.7,14.3,210.2,2.8,196,2.8L196,2.8z M196,45.2c-9.3,0-16.8-7.5-16.8-16.8s7.5-16.8,16.8-16.8
                       c9.3,0,16.8,7.5,16.8,16.8S205.3,45.2,196,45.2z"/>
                   <path id="element-id-16207" class="st0" d="M256.8,3.5V32L229,2.8v50.5h8.8V24.7L265.6,54V3.5H256.8z"/>
                   <path id="element-id-29227" class="st0" d="M308,3.5h-17.6v49.8H308c13.8,0,24.9-11.1,24.9-24.9S321.8,3.5,308,3.5z M308,50.3
                       h-14.6V6.4H308c12.1,0,22,9.8,22,22C330,40.5,320.1,50.3,308,50.3z"/>
                   <path id="element-id-24950" class="st0" d="M346,50.3V29.9h22v-2.9h-22V6.4h24.9l1.5-2.9h-29.3v49.8h29.3l-1.5-2.9H346z"/>
                   <path id="element-id-76468" class="st0" d="M420.5,3.5l-18.1,43l-18.1-43h-3.1L402.4,54l21.2-50.5H420.5z"/>
               </g>
           </g>
       </g>
       </svg>    
     );
   }