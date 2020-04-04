import React, {useState} from 'react'
import '../UpperFilters.css'

export default function UpperFilters() {

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <a class="navbar-brand" href="/">Real Estate Search</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarColor02">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                    <a class="nav-link" href="#">Buy</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Rent</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Mortgage</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Saved Homes</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Saved Searches</a>
                  </li>

                </ul>
                <form class="form-inline my-2 my-lg-0">
                  <input class="form-control mr-sm-2" type="text" placeholder="Search" />
                  <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>
              </div>
            </nav>

        <br /><br />
            
        </div>
    )
}
