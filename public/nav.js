if (localStorage.getItem("uid")) {
  document.write(`

    
<div class="navbar-fixed">
  <nav class="#ff6d00 orange accent-4">
      <div class="container">

      <div class="nav-wrapper">
         <ul class="hide-on-med-and-down">

                    <li class="left" > <a  href="/index.html">Home</a> </li>
        
        
        
        
                    <li > <a  href="/view_users.html">Get All Users</a> </li>
                    <li > <a  class="logout" href="/logout.html"> Logout</a> </li>
        </ul>
      </div>
      </div>
  </nav>
</div>


            `)
} else {
  document.write(`
        
<div class="navbar-fixed">
  <nav class="#ff6d00 orange accent-4">
    <div class="container">
      <div class="nav-wrapper">
         <ul class="hide-on-med-and-down">

                    <li class="left" > <a  href="/index.html">Home</a> </li>
        
        
        
        
                    <li > <a  href="/login.html">Login</a> </li>
        </ul>
      </div>
    </div>
  </nav>
</div>



            `)
}