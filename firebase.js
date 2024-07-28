// IMPORTS ALL FUNCTIONS FROM FIREBASE
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getDatabase, ref, set, get, child, update, remove, onChildAdded, onChildRemoved, onChildChanged, push } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
// FIREBASE CONFIGURATION
  const firebaseConfig={
    apiKey: "AIzaSyCO845Oa7sHZiejv9Pq9XjJSrT3nO_aRBs",
    authDomain: "msf-sepecial-force.firebaseapp.com",
    databaseURL: "https://msf-sepecial-force-default-rtdb.firebaseio.com",
    projectId: "msf-sepecial-force",
    storageBucket: "msf-sepecial-force.appspot.com",
    messagingSenderId: "1063346723515",
    appId: "1:1063346723515:web:7dcc94ad2379e396ede79e"
  };

// INITIALIZE FIREBASE
  const app=initializeApp(firebaseConfig);
  const Database=getDatabase();
  
  if(location.pathname==='./MSF/login.html'){
    if(localStorage.getItem('USER')){
      var USER=localStorage.getItem('USER');
      confirm('Alredy Logged in as:- '+USER);
      inp_submit.value='Update';
      
      get(ref(Database,USER)).then((snapshot)=>{
        inp_username.value=snapshot.val().name;
        inp_tel.value=snapshot.val().tel;
        inp_userpost.value=snapshot.val().post;
      })
      
      form_newuser.onsubmit=(e)=>{e.preventDefault();
        if(confirm('Are You Sure You Want To Update Form')){
          set(ref(Database,USER),{
            name: inp_username.value,
            tel: inp_tel.value,
            post: inp_userpost.value
          });
          get(ref(Database,USER)).then((snapshot)=>{
            if(snapshot){
              alert('Updated Successfuly (•‿•)');
              window.location.href='/MSF/index.html';
            }
          });
        }
      }
      
    }else if(!localStorage.getItem('USER')){
      alert('Create New Account')
      form_newuser.onsubmit=(e)=>{e.preventDefault();
        localStorage.setItem('USER',inp_username.value);
        set(ref(Database,inp_username.value),{
          name: inp_username.value,
          tel: inp_tel.value,
          post: inp_userpost.value
        });
        
        get(ref(Database,USER)).then((snapshot)=>{
          if(snapshot){
            window.location.href='/MSF/index.html';
          }
        });
        
      }
    }
  }else{
    if(!localStorage.getItem('USER')){
      window.location.href='/MSF/login.html';
    }
    var i=1;
    onChildAdded(ref(Database),(snapshot)=>{
      container_list.innerHTML+=`
        <member id="`+snapshot.val().name+`">
          <span id="list_no">`+ i++ +`</span>
          <span id="list_name">`+snapshot.val().name+`</span>
          <span id="list_post">`+snapshot.val().post+`</span>
          <span id="list_mobile_no">91+ `+snapshot.val().tel+`</span>
        </member>
      `;
    })
  }
  
  
