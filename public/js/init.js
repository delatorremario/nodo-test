/* Script D3 */

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

/* HINT: Usar la misma URL, no es necesario cambiar este código, si no el que está en la ruta '/tree_data' */
d3.json('/tree_data', function (error, graph) {
    if (error) throw error;

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .attr("id", function (d) { return d.id; })
        .attr("fill", function (d) { return color(d.group); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")
        .text(function (d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
    }
});

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}



/* D3 Click Event - Handle by jQuery */
$(document).on("click", "circle", function () {
    /* TODO: Extraer datos de los nodos por :id para mostrar en la vista */
    $.ajax({
        type: 'get',
        url: '/users/' + this.id,
        dataType: 'JSON',
        success: function (res) {
            console.log('user', res); // As stated, for some reason even though the file is being successfully written to via this post function, nothing works here.
            $("#user").html(getHtmlUser(res));
        }
    });
});


function getHtmlUser(user) {

    var html = '<div class="row">';
    html += '<div class="col-lg-6">';
    html += '<div class="thumbnail">';
    html += '<img src="' + user.picture.large + '">"';
    html += '<div class="caption">';
    html += '<h3>' + user.name + '</h3>';
    html += '<>' + user.email + '</p>';
    html += '</div></div></div></div>';

    return html;
}