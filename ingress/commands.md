DESCRIPTION: terminal responses are marked ">".

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml

kubectl get namespaces
>NAME              STATUS   AGE
>ingress-nginx     Active   23s

kubectl get pods -n ingress-nginx
>NAME                                        READY   STATUS      RESTARTS   AGE
>ingress-nginx-admission-create-txfjx        0/1     Completed   0          86s
>ingress-nginx-admission-patch-5qmcp         0/1     Completed   2          86s
>ingress-nginx-controller-86cbd65cf7-lnfn2   1/1     Running     0          97s

kubectl exec -it ingress-nginx-controller-86cbd65cf7-lnfn2 -n ingress-nginx -- /nginx-ingress-controller --version
>
-------------------------------------------------------------------------------
NGINX Ingress controller
  Release:       0.33.0
  Build:         git-589187c35
  Repository:    https://github.com/kubernetes/ingress-nginx
  nginx version: nginx/1.19.0

-------------------------------------------------------------------------------
>


kubectl apply -f mybackend-deployment.yml
kubectl delete svc mybackend-service
kubectl create -f mybackend-service-clusterip.yml
kubectl apply -f mybackend-service-clusterip.yml
kubectl apply -f ingress-service.yml

kubectl get ingress
kubectl describe ??NIE WIEM CO???

