function populateMonsterInfo() {
    // Get the selected monster from the dropdown menu
    var selectedMonster = document.getElementById("monsterSelect").value;

    // Fetch the JSON data from the external file
    fetch('monstros/monstros.json')
      .then(response => response.json())
      .then(data => {
        // Find the selected monster's dataFile from the fetched JSON data
        var monsterDataFile = data.monster.find(monster => monster.name === selectedMonster).dataFile;

        // Fetch the selected monster's data from its dataFile
        fetch('monstros/' + monsterDataFile)
          .then(response => response.json())
          .then(monster => {
            // Populate the image and description
            document.getElementById("monsterName").innerHTML = monster.name;
            document.getElementById("monsterFVTT").innerHTML = monster.fvtt;
            document.getElementById("monsterImage").src = monster.image;
            document.getElementById("monsterImage").alt = monster.imgalt;
            document.getElementById("monsterCaption").innerHTML = monster.caption;

            var contspecs = 0
            for (var spec in monster.specs) {
              if (contspecs % 3 == 0){
                
              }
            }
            document.getElementById("monsterSpecs").innerHTML = monster.caption;

            document.getElementById("monsterSummary").innerHTML = monster.summary;

            // Populate the statblock
            var specs = monster.specs;
            var specsSentence = "";

            if (specs.Conceito) {
                specsSentence += specs.Conceito;
            }

            if (specs.Tamanho) {
                if (specsSentence) {
                    specsSentence += ", " + specs.Tamanho;
                } else {
                    specsSentence += specs.Tamanho;
                }
            }

            if (specs.Alinhamento) {
                if (specsSentence) {
                    specsSentence += ", " + specs.Alinhamento;
                } else {
                    specsSentence += specs.Alinhamento;
                }
            }

            if (specs.Ambiente) {
                specsSentence += "<span class='no-select'> &#x25C6;</span> " + specs.Ambiente;
            }

            document.getElementById("monsterSpecs").innerHTML = specsSentence;

            // Populate the behavior, attacks, traits, and credits
            document.getElementById("monsterEncontro").innerHTML = monster.Encontro;
            document.getElementById("monsterExperiencia").innerHTML = monster.Experiencia;
            document.getElementById("monsterTesouro").innerHTML = monster.Tesouro;
            document.getElementById("monsterMovimento").innerHTML = monster.Movimento;
            document.getElementById("monsterDV").innerHTML = monster.DV;
            document.getElementById("monsterCA").innerHTML = monster.CA;
            document.getElementById("monsterJP").innerHTML = monster.JP;
            document.getElementById("monsterMO").innerHTML = monster.MO;
            
            document.getElementById("monsterAtaques").innerHTML = monster.ataques;

            document.getElementById("monsterDescription").innerHTML = monster.description;
            document.getElementById("monsterCombat").innerHTML = monster.combat;
            document.getElementById("monsterSociety").innerHTML = monster.society;
            document.getElementById("monsterEcology").innerHTML = monster.ecology;
            document.getElementById("monsterVariacoes").innerHTML = monster.variacoes;
            document.getElementById("monsterOrigem").innerHTML = monster.origem;
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
}

// Add an event listener to the dropdown menu to call the populateMonsterInfo function when a selection is made
document.getElementById("monsterSelect").addEventListener("change", populateMonsterInfo);
