<?php
add_action('init', 'leo_dist_register_shortcodes');
function leo_dist_register_shortcodes(){
    add_shortcode('leo-time-dist', 'leo_dist_shortcode');
}
function leo_dist_shortcode(){
	 $displayform='<div class="container">
			<div class="col-md-6">
				<div class="col-md-12">
					<div class="panel panel-default">
						<legend class="text-center header">
							Discover
						</legend>
						<form class="form-horizontal" method="post">
							<fieldset>
								<div class="form-group">
									<div class="col-md-10 col-md-offset-1" style="margin-top: 15px;">
										<input id="source" name="source" type="text" placeholder="Enter Your Home Address" class="form-control">
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12 text-center">
										<div class="form-group">
										<div class="col-md-10 col-md-offset-1">
											<div id="stops_div" style="margin-bottom: 10px;">
											</div>
											<div class="clearfix">
											</div>
											<input hidden type="checkbox" class="form-control" style="display: none;" name="stops" id="stops" onChange="set_stops()"/>
											<label style="    padding: 0px 15px;">
												Add your Stops
											</label>
											<input type="button"  style="border-radius: 0px;    padding: 3px 25px; font-size: 17px;" value="+ Add Stop" class="btn btn-primary btn-lg" onclick="addcontrol()" name="stops_count" id="stops_count" style="margin-bottom: 6px;" />
										</div>
                                        </div>
									</div>
								</div>
								<div class="form-group">
                                    <div class="col-md-10 col-md-offset-1" style="text-align:center;">
									<div id="stoplast"></div>
									</div>
									<div class="col-md-10 col-md-offset-1">
										<input id="destination" name="destination" type="text" placeholder="Enter Your Home Address" class="form-control">
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12 text-center">
										<button type="button" name="submit" style="border-radius: 0px;padding: 3px 25px; font-size: 17px;" onClick="doCalculation()" class="btn btn-primary btn-lg">
											Discover
										</button>
                                        <button type="button" name="reset" style="border-radius: 0px;padding: 3px 25px;  font-size: 17px;" onclick="clear_form_elements(this.form)"  class="btn btn-primary btn-lg">
											Reset
										</button>
									</div>
								</div>
								<div class="form-group">
									<label class=" col-sm-1 control-label" for="">
									</label>
									<div class="col-sm-11">
										<input type="hidden" name="distance" id="distance" readonly value=""/>
                                        <input type="hidden" name="distancemile" id="distancemile" readonly value=""/>										
										<input type="hidden" name="fare" id="fare" readonly value=""/>
										<input type="hidden" name="duration" id="duration" readonly value=""/>
										<input type="hidden" name="latitude" id="latitude" value=""/>
										<input type="hidden" name="longitude" id="longitude" value=""/>
										<input type="hidden" name="dest_latitude" id="dest_latitude" value=""/>
										<input type="hidden" name="dest_longitude" id="dest_longitude" value=""/>							
									</div>
								</div>
								<div class="clear">
								</div>
							</fieldset>
						</form>
						<div class="text-center">
							<img src="'.plugins_url("img/", __FILE__).'/world-map-icon.png" alt="jQuery Autocomplete ShieldUI" title="jQuery Autocomplete ShieldUI" />
						</div>
					</div>
				</div>
				<div class="col-md-12">
					<div>
						<div class="panel panel-default">
							<div class="text-center header">
								Result
							</div>
							<div class="panel-body text-center">
								<div class="row" id="po">
									</div>
								<div class="row" id="summarydiv" style="display:none">
									<div class="col-sm-6 col-md-6 col-lg-6">
										<div class="panel text-center">
											<div class="col-md-4 stats-item" style="background-color: #00AABF">
												<i style="background-color: #00AABF; font-size: 53px" class="fa fa-map-marker bigicon">
												</i>
											</div>
											<div style="background-color: #00BCD4" class="col-md-8 stats-item">
												<div class="header-item">
													Total Distance
												</div>
												<div class="data-item" id="tdistance">
												</div>
											</div>
										</div>
									</div>
                                    <div class="col-sm-6 col-md-6 col-lg-6">
                                            <div class="panel text-center">
                                                <div class="col-md-4 stats-item" style="background-color: #7DB043">
                                                    <i style="background-color: #7DB043; font-size: 53px" class="fa fa-cloud-download bigicon"></i>
                                                </div>
                                                <div style="background-color: #7DB043;" class="col-md-8 stats-item">
                                                    <div class="header-item">Total Time</div>
                                                    <div class="data-item" id="tttime"></div>
                                                </div>
                                            </div>
                                     </div>
								</div>
								<div id="map1" class="map">
									<div id="googleMap" style=";height:450px;">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>';
return $displayform;
} 
?>